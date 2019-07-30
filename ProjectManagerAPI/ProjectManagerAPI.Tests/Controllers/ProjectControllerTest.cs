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
    public class ProjectControllerTest
    {
        [TestMethod]
        public void GetProjectTabs()
        {
            var projectCtrl = new ProjectTabsController();
            var proj = projectCtrl.GetProjectTabs();
            Assert.IsTrue(proj.Count() > 1, "This List contains more than 1 record");
        }

        [TestMethod]
        public void Put()
        {
            var projectTab = new ProjectTab();
            projectTab.Project_ID = 3;

            projectTab.Project = "ModifiedTestProject";
            projectTab.StartDate = new System.DateTime(2019, 07, 30);
            projectTab.EndDate = new System.DateTime(2019, 07, 31);
            projectTab.Priority = 10;

            projectTab.Manager = new UsersTab
            {
                User_ID = 1,
                FirstName = "Niraj",
                LastName = "Kheria",
                Employee_ID = 123456,
                Task_ID = 3,
                Project_ID = 1
            };

            var projectCtrl = new ProjectTabsController();
            projectCtrl.Request = new HttpRequestMessage();
            projectCtrl.Configuration = new HttpConfiguration();
            var tsk = projectCtrl.Put(projectTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }

        [TestMethod]
        public void PostTaskTab()
        {
            var projectTab = new ProjectTab();

            projectTab.Project = "CreatedTestProject";
            projectTab.StartDate = new System.DateTime(2019, 07, 30);
            projectTab.EndDate = new System.DateTime(2019, 07, 31);
            projectTab.Priority = 10;

            projectTab.Manager = new UsersTab
            {
                User_ID = 1,
                FirstName = "Niraj",
                LastName = "Kheria",
                Employee_ID = 123456,
                Task_ID = 3,
                Project_ID = 1
            };

            var projectCtrl = new ProjectTabsController();
            projectCtrl.Request = new HttpRequestMessage();
            projectCtrl.Configuration = new HttpConfiguration();
            var tsk = projectCtrl.PostProjectTab(projectTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }
    }
}
