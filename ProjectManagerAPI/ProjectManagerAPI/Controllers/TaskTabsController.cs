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
    public class TaskTabsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/TaskTabs
        public IQueryable<TaskTab> GetTaskTabs()
        {
            var taskList = db.TaskTabs;

            foreach(var task in taskList)
            {
                if(task.Parent_ID != null && task.Parent_ID.HasValue)
                {
                    var parentTask = (new ParentTaskTabsController()).GetParentTaskTab(task.Parent_ID.Value);
                    task.ParentTaskName = parentTask.Parent_Task;
                }

                    var userList = (new UsersTabsController()).GetUsersTabs().Where(x => x.Task_ID == task.Task_ID);
                if (userList != null && userList.Count() > 0)
                {
                    task.User = userList.FirstOrDefault();
                }
            }

            return taskList;
        }

        // PUT: api/TaskTabs/5

        public HttpResponseMessage Put(TaskTab taskTab)
        {
            db.Entry(taskTab).State = EntityState.Modified;

            try
            {


                taskTab.User.Task_ID = taskTab.Task_ID;
                var usersTabController = new UsersTabsController();
                var prevUser = usersTabController.GetUsersTabs().FirstOrDefault
                    (x => x.Task_ID == taskTab.Task_ID);

                if (prevUser == null)
                {
                    usersTabController.Put(taskTab.User);
                }

                else if (prevUser != null && prevUser.Task_ID != null && prevUser.User_ID != taskTab.User.User_ID)
                {
                    prevUser.Task_ID = (int?)null;
                    usersTabController.Put(prevUser);
                    usersTabController.Put(taskTab.User);
                }


                db.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, taskTab);
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // POST: api/TaskTabs
        [HttpPost]
        public HttpResponseMessage PostTaskTab(TaskTab taskTab)
        {
            var lstTasks = GetTaskTabs();
            var task_id = 1;
            if (lstTasks != null && lstTasks.Count() > 0)
            {
                task_id = lstTasks.Max(x => x.Task_ID) + 1;
            }

            taskTab.Task_ID = task_id;

            db.TaskTabs.Add(taskTab);

            try
            {
                db.SaveChanges();

                if (taskTab.User != null)
                {
                    taskTab.User.Task_ID = task_id;
                    var usersTabController = new UsersTabsController();
                    usersTabController.Put(taskTab.User);
                }

                var message = Request.CreateResponse(HttpStatusCode.Created, taskTab);
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