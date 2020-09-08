using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IDatingRepository _datingRep;
    private readonly IMapper _mapper;
    private readonly IOptions<CloudinarySettings> _cloudinaryOptions;
    private readonly Cloudinary cloudinary;
    public UserController(IDatingRepository datingRep, IMapper mapper, IOptions<CloudinarySettings> options)
    {
      this._cloudinaryOptions = options;
      this._datingRep = datingRep;
      this._mapper = mapper;

      Account account = new Account(this._cloudinaryOptions.Value.CloudName, this._cloudinaryOptions.Value.ApiKey, this._cloudinaryOptions.Value.ApiSecret);

      cloudinary = new Cloudinary(account);

    }
    // GET api/values
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var values = await _datingRep.GetUsers();
      Console.WriteLine(_datingRep.randomNumber);
      return Ok(_mapper.Map<IEnumerable<UserForListDto>>(values));
    }

    // GET api/values/5

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      var values = await _datingRep.GetUser(id);
      Console.WriteLine(_datingRep.randomNumber);
      return Ok(_mapper.Map<UserForDetailDto>(values));
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(int id, UserForUpdateDto user)
    {
      try
      {
        if (id.ToString() != User.FindFirst(ClaimTypes.NameIdentifier).Value)
          return Unauthorized();

        User userFromRepo = await this._datingRep.GetUser(id);

        var ciao = _mapper.Map(user, userFromRepo);

        if (await this._datingRep.SaveAll())
          return NoContent();

        throw new Exception("Update user" + id + "failed on save");
      }
      catch (Exception ex)
      {
        throw new Exception("Update user" + id + "failed on save. Message:" + ex.Message);
      }
    }

    // POST api/values
    [HttpPost("{id}/photo")]
    public async Task<IActionResult> Post(IFormFile file, int id)
    {
      if (id.ToString() != User.FindFirst(ClaimTypes.NameIdentifier).Value)
        return Unauthorized();

      User userFromRepo = await this._datingRep.GetUser(id);
      Photo photo;
      ImageUploadResult uploadResult;
      using (var memoryStream = new MemoryStream())
      {
        await file.CopyToAsync(memoryStream);
        // Upload the file if less than 2 MB
        // if (memoryStream.Length < 2097152)
        // {
        //   cloudinary.Api.UrlImgUp.Transform(new Transformation()
        //  .Width(15).Height(15).Gravity("face").Crop().Chain()
        //  .Radius(20).Chain()
        //  .Effect("sepia").Chain()
        //  .Overlay(new Layer().PublicId("cloudinary_icon")).Gravity("south_east").X(5).Y(5).Width(50).Opacity(60).Effect("brightness:200").Chain()
        //  .Angle(10)).Secure(true).BuildImageTag("front_face.png");

        // {
        Transformation ciao = new Transformation()
  .Width(150).Height(150).Gravity(CloudinaryDotNet.Gravity.Face).Crop("thumb");


        memoryStream.Seek(0, SeekOrigin.Begin);
        var uploadParams = new ImageUploadParams()
        {
          File = new FileDescription(file.FileName, memoryStream),
          Transformation = ciao,
          // File = new FileDescription(@"WonderWomanTA.jpg"),
        };

        uploadResult = cloudinary.Upload(uploadParams);
        photo = new Photo();
        if (uploadResult.Error == null)
        {
          photo.url = uploadResult.SecureUrl.AbsoluteUri;
          photo.PublicId = uploadResult.PublicId;
          userFromRepo.Photos.Add(photo);
          await _datingRep.SaveAll();
        }
        else
        {
          throw new Exception(uploadResult.Error.Message);
        }
        // else
        // {
        //   ModelState.AddModelError("File", "The file is too large.");
        // }
      }

      return Ok(photo);
    }

    [HttpDelete("{id}/photo/{idPhoto}")]
    public async Task<IActionResult> Delete(int id, int idPhoto)
    {
      if (id.ToString() != User.FindFirst(ClaimTypes.NameIdentifier).Value)
        return Unauthorized();

      User userFromRepo = await this._datingRep.GetUser(id);
      Photo photo;
      photo = userFromRepo.Photos.FirstOrDefault(x => x.Id == idPhoto);
      if (photo == null)
      {
        throw new Exception("Photo not present!");
      }
      DelResResult delResResult;

      string[] pubId = new string[1];
      pubId[0] = photo.PublicId;
      delResResult = cloudinary.DeleteResources(ResourceType.Image, pubId);
      //  Upload(uploadParams);

      if (delResResult.Error == null)
      {
        userFromRepo.Photos.Remove(photo);
        await _datingRep.SaveAll();
      }
      else
      {
        throw new Exception(delResResult.Error.Message);
      }
      return NoContent(); ;
    }

    [HttpPut("{id}/photo/{idPhoto}/setMain")]
    public async Task<IActionResult> SetMain(int id, int idPhoto)
    {
      if (id.ToString() != User.FindFirst(ClaimTypes.NameIdentifier).Value)
        return Unauthorized();

      User userFromRepo = await this._datingRep.GetUser(id);

      Photo photo = userFromRepo.Photos.FirstOrDefault(x => x.Id == idPhoto);
      if (photo == null)
      {
        throw new Exception("Photo not present!");
      }
      if (photo.isMain)
      {
        throw new Exception("Photo already set as main!");
      }

      userFromRepo.Photos.Where(x => x.isMain).DefaultIfEmpty(new Photo()).First().isMain = false;
      photo.isMain = true;
      await _datingRep.SaveAll();

      return NoContent(); ;
    }
  }
}


