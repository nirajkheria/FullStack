using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManagerDAC;
using ProjectManagerAPI.Controllers;
using System.Net.Http;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ProjectManagerAPI.Tests.Controllers
{
    [TestClass]
    public class TaskControllerTest
    {
        [TestMethod]
        public void GetTaskTabs()
        {
            var TaskCtrl = new TaskTabsController();
            var tsk = TaskCtrl.GetTaskTabs();
            Assert.IsTrue(tsk.Count() > 1, "This List contains more than 1 record");
        }

        [TestMethod]
        public void Put()
        {
            var taskTab = new TaskTab();
            taskTab.Parent_ID = 1;
            taskTab.Project_ID = 1;
            taskTab.Task_ID = 3;

            taskTab.Task = "ModifiedTestTask";
            taskTab.StartDate = new System.DateTime(2019, 07, 30);
            taskTab.EndDate = new System.DateTime(2019, 07, 31);
            taskTab.Priority = 10;
            taskTab.Status = "Completed";

            taskTab.User = new UsersTab
            {
                User_ID = 1,
                FirstName = "Niraj",
                LastName = "Kheria",
                Employee_ID = 123456,
                Task_ID = 3,
                Project_ID = 1
            };

            var TaskCtrl = new TaskTabsController();
            TaskCtrl.Request = new HttpRequestMessage();
            TaskCtrl.Configuration = new HttpConfiguration();
            var tsk = TaskCtrl.Put(taskTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }

        [TestMethod]
        public void PostTaskTab()
        {
            var taskTab = new TaskTab();
            taskTab.Parent_ID = 1;
            taskTab.Project_ID = 1;

            taskTab.Task = "ModifiedTestTask";
            taskTab.StartDate = new System.DateTime(2019, 07, 30);
            taskTab.EndDate = new System.DateTime(2019, 07, 31);
            taskTab.Priority = 10;
            taskTab.Status = "In Progress";

            taskTab.User = new UsersTab
            {
                User_ID = 1,
                FirstName = "Niraj",
                LastName = "Kheria",
                Employee_ID = 123456,
                Task_ID = 3,
                Project_ID = 1
            };

            var TaskCtrl = new TaskTabsController();
            TaskCtrl.Request = new HttpRequestMessage();
            TaskCtrl.Configuration = new HttpConfiguration();
            var tsk = TaskCtrl.PostTaskTab(taskTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }
    }
}
