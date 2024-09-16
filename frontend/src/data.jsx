import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function (adminProfile) {
  console.log("lenght", adminProfile?.user.courses);
  return [
    {
      icon: <VideocamOutlinedIcon />,
      title: adminProfile?.user?.courses <= 0 ? 0 : adminProfile?.user?.courses,
      des: "Courses",
    },
    {
      icon: <PeopleAltOutlinedIcon />,
      title:
        adminProfile?.user?.articles <= 0 ? 0 : adminProfile?.user?.articles,
      des: "Articles",
    },
    {
      icon: <AccessTimeOutlinedIcon />,
      title: adminProfile?.user?.totalUsers,
      des: "App Users",
    },
  ];
}
