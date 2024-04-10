class KalmanFilter {
    constructor({initialEstimate, initialErrorCovariance, processNoise, measurementNoise}) {
      this.estimate = initialEstimate; // The initial estimate
      this.errorCovariance = initialErrorCovariance; // Initial error covariance
      this.processNoise = processNoise; // Process noise covariance (Q)
      this.measurementNoise = measurementNoise; // Measurement noise covariance (R)
    }
  
    // Prediction step - predict the next state
    predict() {
      // In this simple case, we'll assume the state doesn't change,
      // so we only update the error covariance
      this.errorCovariance += this.processNoise;
      return this.estimate; // Return the predicted state
    }
  
    // Update step - update the estimate with a new measurement
    update(measurement) {
      // Kalman Gain
      const kalmanGain = this.errorCovariance / (this.errorCovariance + this.measurementNoise);
      // Update the estimate
      this.estimate = this.estimate + kalmanGain * (measurement - this.estimate);
      // Update the error covariance
      this.errorCovariance = (1 - kalmanGain) * this.errorCovariance;
    }
  }
  
  module.exports = KalmanFilter; 
  