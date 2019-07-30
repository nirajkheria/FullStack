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
    public class UserControllerTest
    {
        [TestMethod]
        public void GetUsersTabs()
        {
            var userCtrl = new UsersTabsController();
            var lst = userCtrl.GetUsersTabs();
            Assert.IsTrue(lst.Count() > 1, "This List contains more than 1 record");
        }

        [TestMethod]
        public void Put()
        {
            var userTab = new UsersTab
            {
                User_ID = 3,
                FirstName = "ModifiedTest",
                LastName = "User",
                Employee_ID = 333333
            };

            var userCtrl = new UsersTabsController();
            userCtrl.Request = new HttpRequestMessage();
            userCtrl.Configuration = new HttpConfiguration();
            var tsk = userCtrl.Put(userTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }

        [TestMethod]
        public void PostUsersTab()
        {
            var userTab = new UsersTab
            {
                FirstName = "CreatedTest",
                LastName = "User",
                Employee_ID = 333333
            };

            var userCtrl = new UsersTabsController();
            userCtrl.Request = new HttpRequestMessage();
            userCtrl.Configuration = new HttpConfiguration();
            var tsk = userCtrl.PostUsersTab(userTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }
    }
}
