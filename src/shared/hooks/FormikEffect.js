import React from "react";
import { connect } from "formik";

class FormikEffect extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { values, touched, errors, isSubmitting } = this.props.formik;
    const {
      values: nextValues,
      touched: nextTouched,
      errors: nextErrors,
      isSubmitting: nextIsSubmitting,
    } = nextProps.formik;
    if (nextProps.formik !== this.props.formik) {
      this.props.onChange(
        {
          values,
          touched,
          errors,
          isSubmitting,
        },
        {
          values: nextValues,
          touched: nextTouched,
          errors: nextErrors,
          isSubmitting: nextIsSubmitting,
        }
      );
    }
  }

  // eslint-disable-next-line
  render() {
    return null;
  }
}

export default connect(FormikEffect);
