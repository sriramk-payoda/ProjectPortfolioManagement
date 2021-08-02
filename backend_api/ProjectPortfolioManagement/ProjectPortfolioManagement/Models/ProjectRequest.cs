using System;

namespace ProjectPortfolioManagement.Models
{
    public class ProjectRequest
    {
        public string Id { get; set; }
        public string ProjectName { get; set; }
        public string BusinessUnit { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string BusinessPriority { get; set; }
        public string RequestorId { get; set; }
    }
}
