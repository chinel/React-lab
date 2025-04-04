"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./list";
import CourseCreate from "./add";
import CourseEdit from "./edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        //list={ListGuesser} //This is used to automatically render data from json in table format using field names as column names, if you don't want to use a component
      />
    </Admin>
  );
};

export default App;
