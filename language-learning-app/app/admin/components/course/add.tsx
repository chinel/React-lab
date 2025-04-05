import {
  Create,
  minLength,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

export default CourseCreate;
