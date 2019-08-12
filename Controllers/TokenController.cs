using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace jwtReact.Controllers
{
    [Route("api/[Controller]")]
    public class TokenController : ControllerBase
    {
        [Authorize,HttpGet]

        public IActionResult Get()
        {
            var s = User.Identity.Name;
            return new JsonResult("ok");
        }
        private const string SECRET_KEY = "TQvgjeABMPOwCycOqah5EQu5yyVjpmVG";
        public static readonly SymmetricSecurityKey SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECRET_KEY));
        [HttpPost]
        public IActionResult Post([FromBody]u u)
        {
            return new JsonResult( GenerateToken(u.username));
        }
        public class u
        {
            public string username { get; set; }
            public string password { get; set; }
        }
        private string GenerateToken(string u)
        {
            var token = new JwtSecurityToken(
                claims: new Claim[] {
                    new Claim(ClaimTypes.Name,u)
                },
                notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                expires: new DateTimeOffset(DateTime.Now.AddMinutes(30)).DateTime,
                signingCredentials: new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}