import {useState} from "react";

function useSidebar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return { isSidebarVisible, toggleSidebar };
}

export default useSidebar;
