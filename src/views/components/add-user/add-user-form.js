import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../../state/ducks/users';
import { locationActions } from '../../../state/ducks/locations';
import { madrasaActions } from '../../../state/ducks/madrasas';
import { generateSelectOptions } from '../../../utils/select-option-utils';

import {
  Button,
  Container,
  CustomGrid,
  InputContainer,
  Text,
} from '../../kits';
import { SelectInput, StyledDatepicker } from '../';

class UserFormComponent extends Component {
  state = {
    madrasaOptions: [],
    locationOptions: [],
  };
  async componentDidMount() {
    const { getAllLocations, getAllMadrasas, token } = this.props;

    let locations = await getAllLocations(token);
    let madrasas = await getAllMadrasas(token);
    let madrasaOptions = [],
      locationOptions = [];

    if (madrasas.count > 0) {
      madrasaOptions = generateSelectOptions(madrasas.results);
      this.setState({ ...this.state, madrasaOptions });
    }

    if (locations.count > 0) {
      locationOptions = generateSelectOptions(locations.results, 'upazila');
      this.setState({ ...this.state, locationOptions });
    }
  }

  handleClearForm = () => {
    const { resetForm } = this.props;
    resetForm({
      name: '',
      selectedLocation: '',
      selectedGender: '',
      selectedRole: '',
      selectedMadrasa: '',
      selectedBloodGroup: '',
      date_of_birth: '',
      address: '',
      mobile: '',
      last_donated_on: '',
      last_received_on: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
    });
  };

  render() {
    const {
      touched,
      errors,
      setFieldValue,
      setFieldTouched,
      values,
    } = this.props;

    const { madrasaOptions, locationOptions } = this.state;

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
      <Container width={600} m="0 auto">
        <Form>
          <CustomGrid>
            <CustomGrid.Unit size={{ xs: 1, sm: 1 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Name</Text>
                <InputContainer mb={16} mt={8}>
                  <Field type="text" name="name" placeholder="Enter fullname" />
                </InputContainer>
                {touched.name && errors.name && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.name}
                  </Text>
                )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 2 / 3 }}>
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
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
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
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Madrassa</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedMadrasa}
                  keyName="selectedMadrasa"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedMadrasa}
                  touched={touched.selectedMadrasa}
                  placeholder="Select a madrassa"
                  options={madrasaOptions}
                  margin={{ mt: 8, mb: 16 }}
                  size={{ height: 40 }}
                />
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 2 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Date of birth</Text>
                <StyledDatepicker
                  keyName="date_of_birth"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.date_of_birth}
                  touched={touched.date_of_birth}
                  placeholderText="Add birth date"
                  selected={values.date_of_birth}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  className="date-picker"
                  margin={{ mt: 8 }}
                />
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
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
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 2 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Address</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter full address"
                  />
                </InputContainer>
                {touched.address && errors.address && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.address}
                  </Text>
                )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
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
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 2 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Emergency contact</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="emergency_contact_name"
                    placeholder="Enter contact fullname"
                  />
                </InputContainer>
                {touched.emergency_contact_name &&
                  errors.emergency_contact_name && (
                    <Text variant="caption" color="error" mt={8} mb={8}>
                      {errors.emergency_contact_name}
                    </Text>
                  )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Contact Phone</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="emergency_contact_phone"
                    placeholder="Enter mobile number"
                  />
                </InputContainer>
                {touched.emergency_contact_phone &&
                  errors.emergency_contact_phone && (
                    <Text variant="caption" color="error" mt={8} mb={8}>
                      {errors.emergency_contact_phone}
                    </Text>
                  )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Last donated</Text>
                <StyledDatepicker
                  keyName="last_donated_on"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.last_donated_on}
                  touched={touched.last_donated_on}
                  placeholderText="Last doantion date"
                  selected={values.last_donated_on}
                  showMonthDropdown
                  showYearDropdown
                  showTimeSelect
                  dropdownMode="select"
                  timeFormat="HH:mm"
                  dateFormat="MMM d, yyyy h:mm aa"
                  className="date-picker"
                  margin={{ mt: 8 }}
                />
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Last received date</Text>
                <StyledDatepicker
                  keyName="last_received_on"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.last_received_on}
                  touched={touched.last_received_on}
                  placeholderText="Last received date"
                  selected={values.last_received_on}
                  showMonthDropdown
                  showYearDropdown
                  showTimeSelect
                  dropdownMode="select"
                  timeFormat="HH:mm aa"
                  dateFormat="MMM d, yyyy h:mm aa"
                  className="date-picker"
                  margin={{ mt: 8 }}
                />
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
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
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button
                  mt={24}
                  type="button"
                  onClick={this.props.onClear || this.handleClearForm}
                >
                  Cancel
                </Button>
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button type="submit" variant="primary" mt={24}>
                  Add User
                </Button>
              </Container>
            </CustomGrid.Unit>
          </CustomGrid>
        </Form>
      </Container>
    );
  }
}

const AddUserForm = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      selectedLocation: '',
      selectedGender: '',
      selectedRole: '',
      selectedMadrasa: '',
      selectedBloodGroup: '',
      date_of_birth: '',
      address: '',
      mobile: '',
      last_donated_on: '',
      last_received_on: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    selectedLocation: Yup.object().required('Location is required'),
    selectedGender: Yup.object().required('Gender is required'),
    selectedRole: Yup.object().required('Role is required'),
    selectedMadrasa: Yup.object().nullable(),
    selectedBloodGroup: Yup.object().required('Blood group is required'),
    date_of_birth: Yup.string().required('Date of birth is required'),
    address: Yup.string(),
    mobile: Yup.string().required('Phone number is required'),
    last_donated_on: Yup.date().nullable(),
    last_received_on: Yup.date().nullable(),
    emergency_contact_name: Yup.string().required(
      'Emergency contact is required'
    ),
    emergency_contact_phone: Yup.string(),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const { addUser, onAddUser, token, history } = props;
      let data = values;

      data.date_of_birth = values.date_of_birth.toISOString();
      data.blood_group = values.selectedBloodGroup.value;
      data.role = values.selectedRole.value;
      data.gender = values.selectedGender.value;
      data.madrasa = values.selectedMadrasa.value;
      data.place = values.selectedLocation.value;

      if (values.date_of_birth) {
        data.date_of_birth = values.date_of_birth.split('T')[0];
      }

      if (values.last_donated_on) {
        data.last_donated_on = values.last_donated_on;
      } else {
        data.last_donated_on = null;
      }

      if (values.last_received_on) {
        data.last_received_on = values.last_donated_on;
      } else {
        data.last_received_on = null;
      }

      if (onAddUser) {
        onAddUser(data);
      } else {
        let newUser = await addUser(data, token);
        setSubmitting();
        resetForm();
        if (newUser.id) {
          history.push('/feeds');
        }
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitting();
  },
})(UserFormComponent);

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
  };
};

const mapActionsToProps = {
  getAllMadrasas: madrasaActions.getAllMadrasas,
  getAllLocations: locationActions.getAllLocations,
  addUser: userActions.addUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(AddUserForm));
