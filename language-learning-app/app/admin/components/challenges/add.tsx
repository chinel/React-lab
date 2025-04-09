import {
  Create,
  minLength,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="question"
          validate={[required(), minLength(5)]}
          label="Question"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
          validate={required("Please select a type")}
        />

        <ReferenceInput source="lessonId" reference="lessons">
          <SelectInput
            optionText="title"
            validate={required("Please select a lesson")}
          />
        </ReferenceInput>

        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeCreate;
