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
    public class ParentTaskTabsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/ParentTaskTabs
        public IQueryable<ParentTaskTab> GetParentTaskTabs()
        {
            return db.ParentTaskTabs;
        }

        // GET: api/ParentTaskTabs/5
        [ResponseType(typeof(ParentTaskTab))]
        public ParentTaskTab GetParentTaskTab(int id)
        {
            ParentTaskTab parentTaskTab = db.ParentTaskTabs.Find(id);
            

            return parentTaskTab;
        }

        // POST: api/ParentTaskTabs
        [HttpPost]
        public HttpResponseMessage PostParentTaskTab(ParentTaskTab parentTaskTab)
        {
            var parentList = GetParentTaskTabs();

            if (parentList != null && parentList.Count() > 0)
            {
                parentTaskTab.Parent_ID = parentList.Max(x => x.Parent_ID) + 1;
            }
            else
            {
                parentTaskTab.Parent_ID = 1;
            }

            db.ParentTaskTabs.Add(parentTaskTab);

            try
            {
                db.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.Created, parentTaskTab);
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