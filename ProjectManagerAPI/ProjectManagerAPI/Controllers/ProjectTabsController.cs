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
    public class ProjectTabsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/ProjectTabs
        public IQueryable<ProjectTab> GetProjectTabs()
        {
            var projList = db.ProjectTabs;

            if(projList!=null && projList.Count()>0)
            {
                var taskCtrl = new TaskTabsController();
                var userCtrl = new UsersTabsController();

                foreach(var proj in projList)
                {
                    var taskList = taskCtrl.GetTaskTabs().Where(x => x.Project_ID == proj.Project_ID);
                    var userList = userCtrl.GetUsersTabs().Where(x => x.Project_ID == proj.Project_ID);
                    proj.NoofTasks = taskList.Count();
                    proj.Completed = taskList.Where(x => x.Status == "Completed").Count();

                    if(userList != null && userList.Count() > 0)
                    {
                        proj.Manager = userList.FirstOrDefault();
                    }
                }
            }

            return projList;
        }

        private ProjectTab GetProjectTab(int id)
        {
            var projectTab = db.ProjectTabs.Find(id);

            return projectTab;
        }

        // PUT: api/ProjectTabs/5
        
        public HttpResponseMessage Put(ProjectTab projectTab)
        {
            db.Entry(projectTab).State = EntityState.Modified;

            try
            {

                if (projectTab.Manager != null)
                {

                    projectTab.Manager.Project_ID = projectTab.Project_ID;
                    var usersTabController = new UsersTabsController();
                    var proj = this.GetProjectTab(projectTab.Project_ID);
                    var prevManager = usersTabController.GetUsersTabs().FirstOrDefault
                        (x => x.Project_ID == proj.Project_ID);

                    if (prevManager != null && prevManager.Project_ID != null && prevManager.User_ID != projectTab.Manager.User_ID)
                    {
                        prevManager.Project_ID = (int?)null;
                        usersTabController.Put(prevManager);
                        usersTabController.Put(projectTab.Manager);
                    }
                    
                }

                db.SaveChanges();

                

                var message = Request.CreateResponse(HttpStatusCode.Created, projectTab);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        // POST: api/ProjectTabs
        [HttpPost]
        public HttpResponseMessage PostProjectTab(ProjectTab projectTab)
        {
           
            var lstProj = GetProjectTabs();
            var project_id = 1;
            if (lstProj != null && lstProj.Count() > 0)
            {
                project_id = lstProj.Max(x => x.Project_ID) + 1;
            }

            projectTab.Project_ID = project_id;

            db.ProjectTabs.Add(projectTab);

            

            try
            {
                db.SaveChanges();

                if (projectTab.Manager != null)
                {
                    projectTab.Manager.Project_ID = project_id;
                    var usersTabController = new UsersTabsController();
                    usersTabController.Put(projectTab.Manager);
                }

                var message = Request.CreateResponse(HttpStatusCode.Created, projectTab);
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