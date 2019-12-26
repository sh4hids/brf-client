import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
import { SelectInput } from '../';

class UserFormComponent extends Component {
  state = {
    locationOptions: [],
  };
  async componentDidMount() {
    const { getAllLocations, token } = this.props;

    let locations = await getAllLocations(token);
    let locationOptions = [];

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
      address: '',
      phone: '',
      contact_person: '',
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

    const { locationOptions } = this.state;

    return (
      <Container width={600} m="0 auto">
        <Form>
          <CustomGrid>
            <CustomGrid.Unit size={{ xs: 1, sm: 1 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Madrasa Name</Text>
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

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 2 }}>
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

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 2 }}>
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

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Mobile</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter mobile number"
                  />
                </InputContainer>
                {touched.phone && errors.phoe && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.phone}
                  </Text>
                )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Contact Person</Text>
                <InputContainer mb={16} mt={8}>
                  <Field
                    type="text"
                    name="contact_person"
                    placeholder="Enter contact fullname"
                  />
                </InputContainer>
                {touched.contact_person && errors.contact_person && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.contact_person}
                  </Text>
                )}
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
                  Add Madrasa
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
      address: '',
      phone: '',
      contact_person: '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Madrasa name is required'),
    selectedLocation: Yup.object().required('Location is required'),
    address: Yup.string().required('Adress is required'),
    phone: Yup.string(),
    contact_person: Yup.string().required('Contact person is required'),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const { addMadrasa, token, history } = props;
      let data = values;

      data.place = values.selectedLocation.value;

      let newMadrasa = await addMadrasa(data, token);
      setSubmitting();
      resetForm();
      if (newMadrasa.id) {
        history.push('/feeds');
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
  addMadrasa: madrasaActions.addMadrasa,
  getAllMadrasas: madrasaActions.getAllMadrasas,
  getAllLocations: locationActions.getAllLocations,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(AddUserForm));
