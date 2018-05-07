import React from 'react';
import {
  Form,
  Input,
  Tabs,
  Button,
  Icon,
  Checkbox
} from 'antd';
import { Link } from 'react-router-dom';
import styles from './Login.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

class Login extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Form>
          <Tabs animated={false} className={styles.tabs}>
            <TabPane tab="账户密码登录" key="account">
              <FormItem>
                <Input
                  size="large"
                  prefix={<Icon type="user" className={styles.prefixIcon} />}
                  placeholder="admin"
                />
              </FormItem>
              <FormItem>
                <Input
                  size="large"
                  prefix={<Icon type="lock" className={styles.prefixIcon} />}
                  type="password"
                  placeholder="888888"
                />
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
            <a className={styles.forgot} href="">
              忘记密码
            </a>
            <Button
              size="large"
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <Link to="/">登录</Link>
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Login;
