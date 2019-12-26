import React, { Component, Fragment } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import { SelectInput, StyledDatepicker } from '../';
import {
  Button,
  Container,
  CustomGrid,
  Devider,
  StyledText,
  Text,
} from '../../kits';

import { donationActions } from '../../../state/ducks/donations';
import { userActions } from '../../../state/ducks/users';
import { generateSelectOptions } from '../../../utils/select-option-utils';

class RequestDetailsContent extends Component {
  state = {
    requestId: undefined,
    donorOptions: [],
  };

  async componentDidMount() {
    const { requestId, getRequestById, getEligibleDonors, token } = this.props;
    if (requestId !== this.state.requestId) {
      this.setState({ ...this.state, requestId });
      let reqInfo = await getRequestById(requestId, token);
      let donors = await getEligibleDonors(token, {
        blood_group: reqInfo.receiver.blood_group,
      });
      if (donors.count > 0) {
        let donorOptions = generateSelectOptions(donors.results, 'mobile');
        this.setState({ ...this.state, donorOptions });
      }
    }
  }

  searchEligibleDonors = async inputValue => {
    const { requestDetails, getEligibleDonors, token } = this.props;
    const searchDebounced = AwesomeDebouncePromise(getEligibleDonors, 500);
    let donors = await searchDebounced(token, {
      blood_group: requestDetails.receiver.blood_group,
      mobile: inputValue,
    });

    if (donors.count > 0) {
      let donorOptions = generateSelectOptions(donors.results, 'mobile');
      this.setState({ ...this.state, donorOptions });
      return donorOptions;
    }
  };

  render() {
    const {
      requestDetails,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      values,
      handleCloseModal,
    } = this.props;
    const { donorOptions } = this.state;

    return (
      <Fragment>
        {requestDetails.receiver ? (
          <Container width={560}>
            <Text variant="h5" color="primary">
              {requestDetails.receiver.name}
            </Text>
            <Devider />

            <Text mb={8}>
              Blood Group:{' '}
              <StyledText color="primary" fontWeight={700}>
                {requestDetails.receiver.blood_group}
              </StyledText>
            </Text>
            <Text mb={8}>
              Request Date:{' '}
              <StyledText color="primary" fontWeight={700}>
                {format(
                  new Date(requestDetails.request_date),
                  'MMMM dd, yyyy',
                  {}
                )}
              </StyledText>
            </Text>
            <Text mb={8}>
              Address:{' '}
              <StyledText color="primary" fontWeight={700}>
                {requestDetails.receiver.address || 'Not mentioned'}
              </StyledText>
            </Text>
            <Devider />
            <Text mb={8}>Reason:</Text>
            <Text color="primary">
              {requestDetails.reason || 'Not mentioned'}
            </Text>
            <Devider />
            {requestDetails.is_served ? (
              <>
                <Text>Request has been served.</Text>
                <Container textAlign="right" mt={144}>
                  <Button
                    width={120}
                    mr={16}
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Container>
              </>
            ) : (
              <Form>
                <CustomGrid mb={16}>
                  <CustomGrid.Unit size={{ xs: 1 }}>
                    <Text mb={8}>Select Donor:</Text>
                    <SelectInput
                      async
                      isMulti={false}
                      value={values.selectedDonor}
                      keyName="selectedDonor"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.selectedDonor}
                      touched={touched.selectedDonor}
                      placeholder="Select a donor"
                      defaultOptions={donorOptions}
                      loadOptions={this.searchEligibleDonors}
                      margin={{ mt: 8 }}
                      size={{ height: 40 }}
                    />
                  </CustomGrid.Unit>
                  <CustomGrid.Unit size={{ xs: 1 }}>
                    <Text mb={8}>Donation Date:</Text>
                    <StyledDatepicker
                      keyName="donation_date"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.donation_date}
                      touched={touched.donation_date}
                      placeholderText="Add donation date"
                      selected={values.donation_date}
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      dropdownMode="select"
                      timeFormat="HH:mm"
                      dateFormat="MMM d, yyyy h:mm aa"
                      className="date-picker"
                      margin={{ mt: 8 }}
                    />
                  </CustomGrid.Unit>
                </CustomGrid>
                <Container textAlign="right" mt={56}>
                  <Button
                    width={120}
                    mr={16}
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>{' '}
                  <Button variant="primary" width={120} type="submit">
                    Complete
                  </Button>
                </Container>
              </Form>
            )}
          </Container>
        ) : (
          <Text variant="h5">{'Loading...'}</Text>
        )}
      </Fragment>
    );
  }
}

const RequestDetails = withFormik({
  mapPropsToValues() {
    return {
      selectedDonor: '',
      donation_date: new Date(),
    };
  },
  validationSchema: Yup.object().shape({
    selectedDonor: Yup.object().required('Donor must be selected'),
    donation_date: Yup.string().required('Donation date must be provided'),
  }),
  async handleSubmit(values, { props, setErrors, setSubmitting, resetForm }) {
    try {
      const {
        handleCloseModal,
        requestId,
        serveRequest,
        updateRequest,
        updateUserInfo,
        token,
      } = props;
      let data = {
        donation_date: values.donation_date,
        donor: values.selectedDonor.value,
        request: requestId,
      };

      let servedReq = await serveRequest(data, token);
      if (servedReq.id) {
        await updateUserInfo(
          data.donor,
          { last_donated_on: data.donation_date },
          token
        );
        await updateRequest(requestId, { is_served: true }, token);
      }

      setSubmitting();

      if (servedReq.id) {
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitting();
  },
})(RequestDetailsContent);

const mapStateToProps = ({ auth, donations, users }) => {
  return {
    token: auth.token,
    requestDetails: donations.requestDetails,
    eligibleDonors: users.eligibleDonors,
  };
};

const mapActionsToProps = {
  getRequestById: donationActions.getRequestById,
  updateRequest: donationActions.updateRequest,
  serveRequest: donationActions.serveRequest,
  getEligibleDonors: userActions.getEligibleDonors,
  updateUserInfo: userActions.updateUserInfo,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RequestDetails);
