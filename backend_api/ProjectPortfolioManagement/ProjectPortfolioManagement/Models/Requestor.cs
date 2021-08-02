using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectPortfolioManagement.Models
{
    [Table("requestors")]
    public class Requestor
    {
        public string Id { get; set; }
        public string RequestorName { get; set; }
        public string EmailId { get; set; }
        public long PhoneNo { get; set; }
        public List<ProjectRequest> project_requests { get; set; }
    }
}
