import { useState, useEffect, useRef } from 'react';

export default function OTPVerification({ type, onClose, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    // Simulate verification (in real app, this would call an API)
    if (otpString === '123456') {
      onVerified();
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        alert('Too many failed attempts. Please try again later.');
        onClose();
      } else {
        alert('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300); // Reset timer
      setOtp(['', '', '', '', '', '']);
      setAttempts(0);
      inputRefs.current[0]?.focus();
      alert('New OTP sent successfully!');
    }, 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTitle = () => {
    switch (type) {
      case 'password':
        return 'Verify Password Change';
      case 'phone':
        return 'Verify Phone Number';
      default:
        return 'OTP Verification';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'password':
        return 'We\'ve sent a verification code to your registered email address to confirm the password change.';
      case 'phone':
        return 'We\'ve sent a verification code to your new phone number to confirm the change.';
      default:
        return 'Please enter the verification code sent to your device.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-70 flex items-center justify-center p-4">
      <div className="bg-[#FCCB6E] rounded-2xl w-full max-w-md border-2 border-[#5E5854] shadow-2xl">
        {/* Header */}
        <div className="bg-[#6F93AD] p-6 rounded-t-2xl border-b border-[#5E5854]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#204231]">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="text-[#204231] hover:text-[#EC8E3D] text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Icon */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#EC8E3D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <p className="text-[#204231] text-center leading-relaxed">
              {getDescription()}
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <label className="block text-[#204231] font-semibold text-center">
              Enter 6-digit verification code
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold bg-[#6F93AD] border-2 border-[#5E5854] rounded-lg text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] focus:border-[#EC8E3D] transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-[#204231]/70">
                Code expires in <span className="font-bold text-[#EC8E3D]">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="text-red-600 font-semibold">Code has expired</p>
            )}
          </div>

          {/* Attempts Warning */}
          {attempts > 0 && (
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
              <p className="text-orange-800 text-sm text-center">
                ⚠️ {attempts}/3 attempts used. {3 - attempts} attempts remaining.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleVerify}
              disabled={otp.join('').length !== 6 || timeLeft === 0}
              className="w-full bg-[#EC8E3D] hover:bg-[#EE9C8F] disabled:bg-[#5E5854] disabled:cursor-not-allowed text-white py-3 rounded-xl font-cinzel transition-colors"
            >
              🔐 Verify Code
            </button>

            <div className="text-center">
              <p className="text-[#204231]/70 text-sm mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={isResending || timeLeft > 240} // Can resend after 1 minute
                className="text-[#EC8E3D] hover:text-[#EE9C8F] font-cinzel disabled:text-[#5E5854] disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? '📤 Sending...' : '🔄 Resend OTP'}
              </button>
              {timeLeft > 240 && (
                <p className="text-[#204231]/60 text-xs mt-1">
                  Available in {formatTime(timeLeft - 240)}
                </p>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-[#EE9C8F] p-4 rounded-lg border border-[#5E5854]">
            <h4 className="font-bold text-[#204231] mb-2">💡 Tips:</h4>
            <ul className="text-[#204231] text-sm space-y-1">
              <li>• Check your spam/junk folder if you don't see the code</li>
              <li>• Make sure you have good network connectivity</li>
              <li>• The code is valid for 5 minutes only</li>
              <li>• For testing, use code: <span className="font-bold">123456</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
