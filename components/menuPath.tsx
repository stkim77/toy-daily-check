import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';
import * as R from 'ramda';

type MenuPathProps = {
  selectedMenu : string
}

function MenuPath ( {selectedMenu} : MenuPathProps ) {
  const { route } = useRouter();
  const rootMenu = R.slice(1, Infinity, route);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{R.toUpper(rootMenu)}</Breadcrumb.Item>
      <Breadcrumb.Item>{R.toUpper(selectedMenu)}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MenuPath;