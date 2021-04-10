import {isEmpty} from 'lodash';
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';

import Page from "componenets/Page/Page";
import {Input} from "componenets/Form/Form";
import Filters from "componenets/Filters/Filters";
import {Breadcrumbs, Crumb} from "componenets/Breadcrumns/Breadcrumbs";
import {Delete, Edit, Home, Users} from "Icons/Icons";
import Table from "componenets/Table/Table";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {getUsers} from "api/user";
import TextWithActions from "componenets/TextWithActions/TextWithActions";

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

    return Object.values(users).map(({id, username, email, nameToPresent}) => {
      const actions = [
        <Link to={`/user/${id}/edit`}><span className="edit"><Edit /> Edit</span></Link>,
        <Link to={`/user/${id}/delete`}><span className="delete"><Delete /> Delete</span></Link>
      ];

      nameToPresent = isEmpty(nameToPresent) ? '' : nameToPresent;

      return [
        username,
        email,
        <TextWithActions actions={actions}>
          {nameToPresent}
        </TextWithActions>];
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
        navigationButton={{path: '/user/add', text: 'Add user'}}
        // pager={showPager && <Pager />}
        emptyElement={"No files were found. You can add more files with the button above."}
      >
      </Table>
    </RoundedElement>
  </Page>
}
