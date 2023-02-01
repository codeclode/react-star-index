import { Box, createStyles, NavLink } from "@mantine/core";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { frameLocationStoreContext } from "../../store/frameLocation.store";
import { ChartLink } from "../../utils/constants";

interface prop extends ChartLink {
  path: string;
}

const NavbarItem = observer((prop: prop) => {
  const frameLocationStore = useContext(frameLocationStoreContext);
  const [active, setActive] = useState(
    frameLocationStore.url.includes(prop.link)
  );
  useEffect(() => {
    setActive(frameLocationStore.url.includes(prop.link));
  }, [frameLocationStore.url]);

  return (
    <>
      <NavLink
        childrenOffset="xs"
        label={prop.label}
        icon={<prop.icon color={prop.iconColor} />}
        color={prop.color}
        onClick={() => {
          if (!prop.children && !active) {
            frameLocationStore.setLoading(true);
            frameLocationStore.setUrl(prop.path + prop.link);
          }
        }}
        active={active}
      >
        {prop.children
          ? prop.children.map((v, i) => (
              <NavbarItem
                path={prop.path + prop.link + "/"}
                key={i}
                {...v}
              ></NavbarItem>
            ))
          : null}
      </NavLink>
    </>
  );
});

export default NavbarItem;
