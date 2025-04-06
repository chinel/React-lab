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

const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required(), minLength(5)]}
          label="Title"
        />

        <ReferenceInput source="unitId" reference="units">
          <SelectInput
            optionText="title"
            validate={required("Please select a unit")}
          />
        </ReferenceInput>

        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default LessonCreate;
