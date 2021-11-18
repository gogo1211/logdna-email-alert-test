import { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { Row, Col, Form, Button, CloseButton } from 'react-bootstrap';
import { AddEmailInput } from './AddEmailInput';

const schema = yup.object().shape({
  alertMessage: yup.string().required('Please enter Alert message.'),
  frequency: yup.mixed().oneOf(['hourly', 'daily']).required('Please select frequency.'),
  recipients: yup
    .array()
    .of(
      yup.object().shape({
        email: yup.string().email()
      })
    )
    .min(1, 'Please add at least one recipient.')
});

export const EmailAlertForm = ({ onSave, onTestAlert }) => {
  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(schema) });

  const { fields, append, remove } = useFieldArray({ control, name: 'recipients' });

  const handleClickSave = useCallback(() => {
    if (onSave) {
      handleSubmit(onSave)();
    }
  }, [handleSubmit, onSave]);

  const handleClickTestAlert = useCallback(() => {
    if (onTestAlert) {
      handleSubmit(onTestAlert)();
    }
  }, [handleSubmit, onTestAlert]);

  const handleAddRecipient = useCallback(
    (email) => {
      append({ email });
      clearErrors('recipients');
    },
    [append, clearErrors]
  );

  return (
    <Form noValidate>
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Alert Message</Form.Label>
        <Form.Control as="textarea" {...register('alertMessage')} isInvalid={!!errors?.alertMessage?.message} />
        <Form.Control.Feedback type="invalid">{errors?.alertMessage?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} className="mb-4 align-items-center">
        <Form.Label column xs="auto" className="fw-bold">
          Frequency
        </Form.Label>
        <Col xs="auto" className="pt-1">
          <Form.Check
            inline
            type="radio"
            label="Hourly"
            value="hourly"
            {...register('frequency')}
            isInvalid={!!errors?.frequency?.message}
          />
          <Form.Check
            inline
            type="radio"
            label="Daily"
            value="daily"
            {...register('frequency')}
            isInvalid={!!errors?.frequency?.message}
          />
        </Col>
        {errors?.frequency?.message ? (
          <Col xs="12">
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors?.frequency?.message}
            </Form.Control.Feedback>
          </Col>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Email Recipients</Form.Label>
        <AddEmailInput className="mb-2" onAdd={handleAddRecipient} />
        {fields.map((field, index) => (
          <Row key={field.id} className="align-items-center">
            <Col>
              <Form.Control plaintext readOnly {...register(`recipients.${index}.email`)} />
            </Col>
            <Col xs="auto">
              <CloseButton onClick={() => remove(index)} />
            </Col>
          </Row>
        ))}
        {errors?.recipients?.message ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.recipients?.message}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <div className="text-end">
        <Button type="button" className="me-2" onClick={handleClickTestAlert} disabled={isSubmitting}>
          Test Alert
        </Button>
        <Button type="button" onClick={handleClickSave} disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </Form>
  );
};
