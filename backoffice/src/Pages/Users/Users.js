import Page from "../../componenets/Page/Page";
import {Input} from "../../componenets/Form/Form";
import Filters from "../../componenets/Filters/Filters";
import {Breadcrumbs, Crumb} from "../../componenets/Breadcrumns/Breadcrumbs";
import {Home, Users} from "../../Icons/Icons";
import Table from "../../componenets/Table/Table";
import RoundedElement from "../../componenets/RoundedElement/RoundedElement";
import {useState, useEffect} from 'react';
import {getUsers} from "../../api/user";
import {isEmpty} from 'lodash';
import TextWithActions from "../../componenets/TextWithActions/TextWithActions";

export default () => {

  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const {data: users} = await getUsers();
    setUsers(users.users);
  }, []);

  const processUsers = (users) => {
    if (isEmpty(users)) {
      return [];
    }

    return Object.values(users).map(({username, email, nameToPresent}) => {
      return [username, email, <TextWithActions actions={['Edit', 'Delete']}>{nameToPresent}</TextWithActions>];
    });
  };

  return <Page
    title="Users"
    activePage="users"
    topContent={
      <>
        <Breadcrumbs crumbs={[<Crumb title={'Home'} icon={<Home />} />, <Crumb title={'Users'} icon={<Users />} />]} />
        <Filters inputs={[
          <Input title={"Username"} />,
          <Input title={"Email"} />
        ]} />
      </>
      }
  >
    <RoundedElement>
      <Table
        title="Users"
        headers={['Username', 'Email', 'Presentation name']}
        rows={processUsers(users)}
        navigationButton={{path: '/users/add', text: 'Add user'}}
        // pager={showPager && <Pager />}
        emptyElement={"No files were found. You can add more files with the button above."}
      >
      </Table>
    </RoundedElement>
  </Page>
}
