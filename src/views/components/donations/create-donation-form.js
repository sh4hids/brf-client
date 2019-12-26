import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { userActions } from '../../../state/ducks/users';
import { donationActions } from '../../../state/ducks/donations';
import { generateSelectOptions } from '../../../utils/select-option-utils';

import {
  Button,
  Container,
  CustomGrid,
  InputContainer,
  Text,
} from '../../kits';
import { SelectInput, StyledDatepicker } from '../';
import { AddUserForm } from '../add-user';

const appEl = document.getElementById('root');
Modal.setAppElement(appEl);
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: '560px',
    transform: 'translate(-50%, -50%)',
  },
};

class CreateDonationFormComponent extends Component {
  state = {
    userOptions: [],
    isModalOpen: false,
  };
  async componentDidMount() {
    const { getAllUsers, token } = this.props;

    let users = await getAllUsers(token, {});
    let userOptions = [];

    if (users.count > 0) {
      userOptions = generateSelectOptions(users.results);
      this.setState({ ...this.state, userOptions });
    }
  }

  handleClearForm = () => {
    const { resetForm } = this.props;
    resetForm({
      selectedUser: '',
      request_date: '',
      reason: '',
    });
  };

  handleOpenModal = () => {
    this.setState({ ...this.state, isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ ...this.state, isModalOpen: false });
  };

  handleAddUser = async data => {
    const { addUser, getAllUsers, setFieldValue, token } = this.props;
    let newUser = await addUser(data, token);

    let users = await getAllUsers(token);
    let userOptions = [];

    if (users.count > 0) {
      userOptions = generateSelectOptions(users.results);
      this.setState({ ...this.state, userOptions });
    }

    if (newUser.id) {
      setFieldValue('selectedUser', { value: newUser.id, label: newUser.name });
      this.handleCloseModal();
    }
  };

  render() {
    const {
      touched,
      errors,
      setFieldValue,
      setFieldTouched,
      values,
    } = this.props;

    const { userOptions } = this.state;

    return (
      <Container>
        <Form>
          <CustomGrid>
            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Request for</Text>
                <SelectInput
                  isMulti={false}
                  value={values.selectedUser}
                  keyName="selectedUser"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.selectedUser}
                  touched={touched.selectedUser}
                  placeholder="Select a user"
                  options={userOptions}
                  margin={{ mt: 8 }}
                  size={{ height: 40 }}
                />
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 12 }}>
              <Text pt={32} textAlign="center">
                or
              </Text>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 4 }}>
              <Container mr={16}>
                <Button
                  variant="primary"
                  type="button"
                  mt={28}
                  className="btn-small"
                  onClick={this.handleOpenModal}
                >
                  Add User
                </Button>
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1, sm: 1 / 3 }}>
              <Container pl={8} pr={8}>
                <Text variant="caption">Request date</Text>
                <StyledDatepicker
                  keyName="request_date"
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.request_date}
                  touched={touched.request_date}
                  placeholderText="Add request date"
                  selected={values.request_date}
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

            <CustomGrid.Unit size={{ xs: 1, sm: 1 }}>
              <Container pl={8} pr={8} mt={16}>
                <Text variant="caption">Reason</Text>
                <InputContainer mb={16} mt={8} height={100}>
                  <Field
                    component="textarea"
                    name="reason"
                    placeholder="Enter reason"
                  />
                </InputContainer>
                {touched.reason && errors.reason && (
                  <Text variant="caption" color="error" mt={8} mb={8}>
                    {errors.reason}
                  </Text>
                )}
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button
                  mt={30}
                  className="btn-small"
                  type="button"
                  onClick={this.handleClearForm}
                >
                  Clear
                </Button>
              </Container>
            </CustomGrid.Unit>

            <CustomGrid.Unit size={{ xs: 1 / 2, sm: 1 / 2 }}>
              <Container pl={8} pr={8}>
                <Button
                  type="submit"
                  variant="primary"
                  mt={30}
                  className="btn-small"
                >
                  Make Request
                </Button>
              </Container>
            </CustomGrid.Unit>
          </CustomGrid>
        </Form>
        <Modal
          isOpen={this.state.isModalOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Add User Modal"
        >
          <Container>
            <AddUserForm
              onClear={this.handleCloseModal}
              onAddUser={this.handleAddUser}
            />
          </Container>
        </Modal>
      </Container>
    );
  }
}

const CreateDonationForm = withFormik({
  mapPropsToValues() {
    return {
      selectedUser: '',
      request_date: '',
      reason: '',
    };
  },
  validationSchema: Yup.object().shape({
    selectedUser: Yup.object().required(),
    request_date: Yup.string().required(),
    reason: Yup.string().required(),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const { makeRequest, getAllRequests, token } = props;
      let data = values;

      data.receiver = values.selectedUser.value;

      let newRequest = await makeRequest(data, token);

      setSubmitting();
      resetForm();
      if (newRequest.id) {
        await getAllRequests(token);
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitting();
  },
})(CreateDonationFormComponent);

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token,
  };
};

const mapActionsToProps = {
  addUser: userActions.addUser,
  getAllUsers: userActions.getAllUsers,
  makeRequest: donationActions.makeRequest,
  getAllRequests: donationActions.getAllRequests,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(CreateDonationForm));
