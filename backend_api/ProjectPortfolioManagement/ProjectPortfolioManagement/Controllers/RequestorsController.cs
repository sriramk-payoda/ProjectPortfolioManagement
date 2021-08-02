using Microsoft.AspNetCore.Mvc;
using ProjectPortfolioManagement.DataAccess;
using ProjectPortfolioManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectPortfolioManagement.Controllers
{
    [Route("api/[controller]")]
    public class RequestorsController : Controller
    {

        private readonly IDataAccessProvider _dataAccessProvider;
        public RequestorsController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<Requestor> Get()
        {
            return _dataAccessProvider.GetRequestorRecords();
        }
    }
}
