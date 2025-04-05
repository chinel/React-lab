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

const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required(), minLength(5)]}
          label="Title"
        />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />

        <ReferenceInput source="courseId" reference="courses">
          <SelectInput
            optionText="title"
            validate={required("Please select a course")}
          />
        </ReferenceInput>

        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default UnitCreate;
