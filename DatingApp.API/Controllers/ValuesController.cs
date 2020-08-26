using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    private readonly DataContext _context;

    public ValuesController(DataContext context)
    {
      this._context = context;

    }
    // GET api/values
    [HttpGet]
    public async Task<IActionResult> GetValues()
    {
      // throw new Exception("ciaoo");
      // var values = await merda();
      var values = await _context.Values.ToListAsync();

      // await Task.Run(() => Thread.Sleep(5000));
      // await Task.Delay(6000);
      // Task.WaitAll(Task.Delay(5000));
      //   return new string[] { "value1", "value2" };
      return Ok(values);
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
      var values = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

      return Ok(values);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
