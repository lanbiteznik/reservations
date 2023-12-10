package si.arnes.reservationsbackend;

import org.junit.jupiter.api.Test;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import si.arnes.reservationsbackend.exceptions.GlobalExceptionHandler;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class GlobalExceptionHandlerTest {

    @Test
    void handleValidationExceptions() {
        GlobalExceptionHandler handler = new GlobalExceptionHandler();

        // Create an object that the binding result will be for
        Object target = new Object();
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(target, "target");
        FieldError fieldError = new FieldError("target", "fieldName", "defaultMessage");
        bindingResult.addError(fieldError);

        MethodArgumentNotValidException exception = new MethodArgumentNotValidException(null, bindingResult);

        // This method returns a Map<String, String>
        Map<String, String> errors = handler.handleValidationExceptions(exception);

        assertNotNull(errors);
        assertTrue(errors.containsKey("fieldName"));
        assertEquals("defaultMessage", errors.get("fieldName"));
    }
}