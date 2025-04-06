import {
  Edit,
  minLength,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const LessonEdit = () => {
  return (
    <Edit>
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
    </Edit>
  );
};

export default LessonEdit;
