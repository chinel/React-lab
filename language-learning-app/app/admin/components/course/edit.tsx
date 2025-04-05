import { Edit, minLength, required, SimpleForm, TextInput } from "react-admin";

const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required(), minLength(5)]}
          label="Title"
        />
        <TextInput
          source="imageSrc"
          validate={[required()]}
          label="Image Src"
        />
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;
