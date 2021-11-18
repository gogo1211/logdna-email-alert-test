import { useState, useCallback } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { string } from 'yup';

const schema = string().email('Please input valid email.').required('Please input email.');

/**
 * Email Input component for new recipient
 *
 * @param {function} onAdd callback function to handle "+" button click
 */
export const AddEmailInput = ({ onAdd, ...rest }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    setError('');
  }, []);

  const handleClickAdd = useCallback(() => {
    try {
      schema.validateSync(value);
      onAdd?.(value);
      setValue('');
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }, [value, onAdd]);

  return (
    <InputGroup {...rest}>
      <Form.Control aria-label="New Recipient" value={value} onChange={handleChange} isInvalid={!!error} />
      <Button variant="outline-secondary" onClick={handleClickAdd}>
        +
      </Button>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </InputGroup>
  );
};
