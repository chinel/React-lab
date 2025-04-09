import {
  BooleanInput,
  Edit,
  minLength,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="text"
          validate={[required(), minLength(5)]}
          label="Text"
        />
        <BooleanInput source="correct" label="Correct Option" />

        <ReferenceInput source="challengeId" reference="challenges">
          <SelectInput
            optionText="question"
            validate={required("Please select a challenge")}
          />
        </ReferenceInput>

        <TextInput
          source="imageSrc"
          // validate={[required()]}
          label="Image Src"
        />
        <TextInput source="audioSrc" label="Audio Src" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeOptionEdit;
