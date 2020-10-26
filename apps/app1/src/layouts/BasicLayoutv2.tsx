/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, Dispatch, useModel } from 'umi';
// import { Result, Button } from 'antd';
// import Authorized from '@/utils/Authorized';
// import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
// import { getMatchMenu } from '@umijs/route-utils';

// const noMatch = (
//   <Result
//     status={403}
//     title="403"
//     subTitle="Sorry, you are not authorized to access this page."
//     extra={
//       <Button type="primary">
//         <Link to="/user/login">Go Login</Link>
//       </Button>
//     }
//   />
// );
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  // const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */
  // get children authority
  // const authorized = useMemo(
  //   () =>
  //     getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
  //       authority: undefined,
  //     },
  //   [location.pathname],
  // );

  const { formatMessage } = useIntl();


  return (
    <ProLayout
      formatMessage={formatMessage}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={false}
      menuRender={false}
      headerRender={false}
      {...props}
      {...settings}
    >
      {/* <Authorized authority={authorized!.authority} noMatch={noMatch}> */}
        {children}
      {/* </Authorized> */}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
