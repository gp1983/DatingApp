using System;
using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
  public class AutoMapping : Profile
  {
    public AutoMapping()
    {
      CreateMap<User, UserForListDto>()
      .ForMember(dest => dest.PhotoUrl,
      opt => opt.MapFrom(
        src => src.Photos.FirstOrDefault(x => x.isMain).url))
      .ForMember(dest => dest.Age,
      opt => opt.MapFrom(
        src => CalculateAge(src.DateOfBirth)));

      CreateMap<User, UserForDetailDto>()
       .ForMember(dest => dest.PhotoUrl,
      opt => opt.MapFrom(
        src => src.Photos.FirstOrDefault(x => x.isMain).url))
       .ForMember(dest => dest.Age,
            opt => opt.MapFrom(
              src => CalculateAge(src.DateOfBirth)));

      CreateMap<Photo, PhotoForDetailDto>();
      CreateMap<UserForUpdateDto, User>();
      CreateMap<PhotoForDetailDto, Photo>();


    }

    private int CalculateAge(DateTime dateOfBrith)
    {
      int age = DateTime.Now.Year - dateOfBrith.Year;
      if (DateTime.Now.Year + age > DateTime.Now.Year)
      {
        age--;
      }
      return age;
    }
  }
}