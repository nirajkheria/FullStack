using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ProjectManagerDAC;

namespace ProjectManagerAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersTabsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/UsersTabs
        public IQueryable<UsersTab> GetUsersTabs()
        {
            return db.UsersTabs;
        }

        // PUT: api/UsersTabs/5
        public HttpResponseMessage Put(UsersTab usersTab)
        {
            db.Entry(usersTab).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                if(Request == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Created);
                }
                var message = Request.CreateResponse(HttpStatusCode.Created, usersTab);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        // POST: api/UsersTabs
        [HttpPost]
        public HttpResponseMessage PostUsersTab(UsersTab usersTab)
        {
            var usersList = GetUsersTabs();

            if(usersList != null && usersList.Count()>0)
            {
                usersTab.User_ID = usersList.Max(x => x.User_ID) + 1;
            }
            else
            {
                usersTab.User_ID = 1;
            }

            

            db.UsersTabs.Add(usersTab);

            try
            {
                db.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.Created, usersTab);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

       
    }
}