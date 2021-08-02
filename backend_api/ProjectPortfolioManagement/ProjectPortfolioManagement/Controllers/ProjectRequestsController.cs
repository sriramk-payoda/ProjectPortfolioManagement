using Microsoft.AspNetCore.Mvc;
using ProjectPortfolioManagement.DataAccess;
using ProjectPortfolioManagement.Models;
using System;
using System.Collections.Generic;

namespace ProjectPortfolioManagement.Controllers
{
    [Route("api/[controller]")]
    public class ProjectRequestsController : ControllerBase
    {
        private readonly IDataAccessProvider _dataAccessProvider;
        public ProjectRequestsController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<ProjectRequest> Get()
        {
            return _dataAccessProvider.GetProjectRequestRecords();
        }

        [HttpPost]
        public IActionResult Create([FromBody] ProjectRequest project_request)
        {
            if (ModelState.IsValid)
            {
                if (_dataAccessProvider.CheckRequestorExistence(project_request.RequestorId))
                {
                    Guid obj = Guid.NewGuid();
                    project_request.Id = obj.ToString();
                    _dataAccessProvider.AddProjectRequestRecord(project_request);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public ProjectRequest Details(string id)
        {
            return _dataAccessProvider.GetProjectRequestSingleRecord(id);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] ProjectRequest project_request)
        {
            if (ModelState.IsValid)
            {
                if (_dataAccessProvider.CheckRequestorExistence(project_request.RequestorId))
                {
                    _dataAccessProvider.UpdateProjectRequestRecord(project_request);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfirmed(string id)
        {
            var data = _dataAccessProvider.GetProjectRequestSingleRecord(id);
            if (data == null)
            {
                return NotFound();
            }
            _dataAccessProvider.DeleteProjectRequestRecord(id);
            return Ok();
        }
    }
}
