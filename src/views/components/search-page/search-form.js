import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../../state/ducks/users';
import { locationActions } from '../../../state/ducks/locations';
import { communityActions } from '../../../state/ducks/communities';
import { generateSelectOptions } from '../../../utils/select-option-utils';

import {
  Button,
  Box,
  Container,
  CustomGrid,
  Text,
  InputContainer,
} from '../../kits';
import { SelectInput } from '../';

class UserFormComponent extends Component {
  state = {
    communityOptions: [],
    locationOptions: [],
  };
  async componentDidMount() {
    const { getAllLocations, getAllCommunities, token } = this.props;

    let locations = await getAllLocations(token);
    let communities = await getAllCommunities(token);
    let communityOptions = [],
      locationOptions = [];

    if (communities.count > 0) {
      communityOptions = generateSelectOptions(communities.results);
      this.setState({ ...this.state, communityOptions });
    }

    if (locations.count > 0) {
      locationOptions = generateSelectOptions(locations.results, 'upazila');
      this.setState({ ...this.state, locationOptions });
    }
  }

  handleClearForm = () => {
    const { resetForm, setSubmitting } = this.props;
    setSubmitting(false);
    resetForm();
  };

  render() {
    const {
      touched,
      errors,
      setFieldValue,
      setFieldTouched,
      values,
    } = this.props;

    const { communityOptions, locationOptions } = this.state;

    const genderOptions = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ];

    const roleOptions = [
      { value: 'Donor', label: 'Donor' },
      { value: 'Receiver', label: 'Receiver' },
      { value: 'Both', label: 'Both' },
    ];

    const bloodGroups = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
    ];

    return (
      <Container>
        <Form>
          <CustomGrid>
            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Blood Group</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedBloodGroup}
                  keyName="selectedBloodGroup"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedBloodGroup}
                  touched={touched.selectedBloodGroup}
                  placeholder="Select a group"
                  options={bloodGroups}
                  margin={{ mt: 8 }}
                  size={{ height: 40 }}
                />
              </Container>
            </Box>

            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Location</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedLocation}
                  keyName="selectedLocation"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedLocation}
                  touched={touched.selectedLocation}
                  placeholder="Select a location"
                  options={locationOptions}
                  margin={{ mt: 8, mb: 16 }}
                  size={{ height: 40 }}
                />
              </Container>
            </Box>

            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Community</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedCommunity}
                  keyName="selectedCommunity"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedCommunity}
                  touched={touched.selectedCommunity}
                  placeholder="Select a community"
                  options={communityOptions}
                  margin={{ mt: 8, mb: 16 }}
                  size={{ height: 40 }}
                />
              </Container>
            </Box>

            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Mobile</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                  />
                </InputContainer>
                {touched.mobile && errors.mobile && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.mobile}
                  </Text>
                )}
              </Container>
            </Box>

            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Gender</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedGender}
                  keyName="selectedGender"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedGender}
                  touched={touched.selectedGender}
                  placeholder="Select gender"
                  options={genderOptions}
                  margin={{ mt: 8, mb: 16 }}
                  size={{ height: 40 }}
                />
              </Container>
            </Box>

            <Box width={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Role</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedRole}
                  keyName="selectedRole"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedRole}
                  touched={touched.selectedRole}
                  placeholder="Select a role"
                  options={roleOptions}
                  margin={{ mt: 8, mb: 16 }}
                  size={{ height: 40 }}
                />
              </Container>
            </Box>

            <Box width={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button
                  mt={30}
                  className="btn-small"
                  onClick={this.handleClearForm}
                  type="button"
                >
                  Clear
                </Button>
              </Container>
            </Box>

            <Box width={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button
                  type="submit"
                  variant="primary"
                  mt={30}
                  className="btn-small"
                >
                  Search
                </Button>
              </Container>
            </Box>
          </CustomGrid>
        </Form>
      </Container>
    );
  }
}

const AddUserForm = withFormik({
  mapPropsToValues() {
    return {
      selectedLocation: '',
      selectedGender: '',
      selectedRole: '',
      selectedCommunity: '',
      selectedBloodGroup: '',
      mobile: '',
    };
  },
  validationSchema: Yup.object().shape({
    selectedLocation: Yup.object(),
    selectedGender: Yup.object(),
    selectedRole: Yup.object(),
    selectedCommunity: Yup.object().nullable(),
    selectedBloodGroup: Yup.object(),
    mobile: Yup.number(),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const { getAllUsers, token } = props;
      let filter = {
        blood_group: values.selectedBloodGroup.value || '',
        community: values.selectedCommunity.value || '',
        place: values.selectedLocation.value || '',
        gender: values.selectedGender.value || '',
        role: values.selectedRole.value || '',
        mobile: values.mobile || '',
      };

      getAllUsers(token, filter);

      setSubmitting();
    } catch (err) {
      console.log(err);
    }
  },
})(UserFormComponent);

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
  };
};

const mapActionsToProps = {
  getAllCommunities: communityActions.getAllCommunities,
  getAllLocations: locationActions.getAllLocations,
  getAllUsers: userActions.getAllUsers,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(AddUserForm));
