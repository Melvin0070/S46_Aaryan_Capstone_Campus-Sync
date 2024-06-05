import {useState} from "react";

function useSidebar() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return { isSidebarVisible, toggleSidebar };
}

export default useSidebar;
