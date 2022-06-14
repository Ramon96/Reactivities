using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastrucure.Security {
    
    public class isHostRequirement : IAuthorizationRequirement 
    {
           
    }

    public class IsHostRequirementHandler : AuthorizationHandler<isHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dbContext;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, isHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = _dbContext.ActivityAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.AtivityId == activityId).Result;
            
            if(attendee == null) return Task.CompletedTask;

            if (attendee.IsHost) context.Succeed(requirement);
            
             return Task.CompletedTask;

        }
    }
}