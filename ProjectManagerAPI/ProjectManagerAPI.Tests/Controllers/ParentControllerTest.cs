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
    public class ParentControllerTest
    {
        [TestMethod]
        public void GetParentTaskTabs()
        {
            var parentCtrl = new ParentTaskTabsController();
            var lst = parentCtrl.GetParentTaskTabs();
            Assert.IsTrue(lst.Count() > 1, "This List contains more than 1 record");
        }

        [TestMethod]
        public void PostParentTaskTab()
        {
            var parentTab = new ParentTaskTab
            {
                Parent_Task = "Parent2"
            };

            var parentCtrl = new ParentTaskTabsController();
            parentCtrl.Request = new HttpRequestMessage();
            parentCtrl.Configuration = new HttpConfiguration();
            var tsk = parentCtrl.PostParentTaskTab(parentTab);
            Assert.AreEqual(tsk.ReasonPhrase, "Created");
        }
    }
}
