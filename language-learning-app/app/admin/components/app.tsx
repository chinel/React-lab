"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseCreate, CourseEdit, CourseList } from "./course";
import { UnitCreate, UnitEdit, UnitList } from "./unit";
import { LessonCreate, LessonEdit, LessonList } from "./lesson";
import { ChallengeCreate, ChallengeEdit, ChallengeList } from "./challenges";
import {
  ChallengeOptionCreate,
  ChallengeOptionEdit,
  ChallengeOptionList,
} from "./challengeOptions";

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

      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation="title"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />

      <Resource
        name="challengeOptions"
        recordRepresentation="title"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{
          label: "Challenge Options",
        }}
      />
    </Admin>
  );
};

export default App;
