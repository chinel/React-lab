import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <NumberField source="imageSrc" />
        <NumberField source="audioSrc" />
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="question" />
        </ReferenceField>
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </Datagrid>
    </List>
  );
};

export default ChallengeOptionList;
