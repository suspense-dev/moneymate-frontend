import { Platform } from 'react-native';
import { impactAsync, notificationAsync, ImpactFeedbackStyle, NotificationFeedbackType } from 'expo-haptics';

enum SupportedOS {
  IOS = 'ios',
  Android = 'android',
}

class _Vibration {
  get canVibrate(): boolean {
    return Platform.OS === SupportedOS.IOS || Platform.OS === SupportedOS.Android;
  }

  private execute(callback: () => Promise<void>): Promise<void> {
    if (this.canVibrate) {
      return callback();
    }
    return Promise.resolve();
  }

  light(): Promise<void> {
    return this.execute(() => impactAsync(ImpactFeedbackStyle.Light));
  }

  medium(): Promise<void> {
    return this.execute(() => impactAsync(ImpactFeedbackStyle.Medium));
  }

  heavy(): Promise<void> {
    return this.execute(() => impactAsync(ImpactFeedbackStyle.Heavy));
  }

  warning(): Promise<void> {
    return this.execute(() => notificationAsync(NotificationFeedbackType.Warning));
  }

  success(): Promise<void> {
    return this.execute(() => notificationAsync(NotificationFeedbackType.Success));
  }

  error(): Promise<void> {
    return this.execute(() => notificationAsync(NotificationFeedbackType.Error));
  }
}

export const Vibration = new _Vibration();
