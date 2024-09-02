import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function (adminProfile) {
  console.log(adminProfile);
  return [
    {
      icon: <VideocamOutlinedIcon />,
      title: adminProfile?.user?.courses?.length,
      des: "Courses",
    },
    {
      icon: <PeopleAltOutlinedIcon />,
      title: adminProfile?.user?.articles?.length,
      des: "Articles",
    },
    {
      icon: <AccessTimeOutlinedIcon />,
      title: adminProfile?.user?.totalUsers,
      des: "App Users",
    },
  ];
}
