const UserSettings = require('../models/UserSettings');
const SystemSettings = require('../models/SystemSettings');

/**
 * @desc    Get user settings
 * @route   GET /api/settings/user
 * @access  Private
 */
exports.getUserSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let userSettings = await UserSettings.findOne({ userId });

    if (!userSettings) {
      userSettings = await UserSettings.create({ userId });
    }

    res.status(200).json({
      success: true,
      data: userSettings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user settings
 * @route   PUT /api/settings/user
 * @access  Private
 */
exports.updateUserSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let userSettings = await UserSettings.findOne({ userId });

    if (!userSettings) {
      userSettings = await UserSettings.create({
        userId,
        ...req.body
      });
    } else {
      if (req.body.notification) userSettings.notification = req.body.notification;
      if (req.body.theme) userSettings.theme = req.body.theme;
      if (req.body.language) userSettings.language = req.body.language;
      if (req.body.privacy) userSettings.privacy = req.body.privacy;

      await userSettings.save();
    }

    res.status(200).json({
      success: true,
      data: userSettings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get system settings
 * @route   GET /api/settings/system
 * @access  Private (Admin only)
 */
exports.getSystemSettings = async (req, res, next) => {
  try {
    let systemSettings = await SystemSettings.findOne({});

    if (!systemSettings) {
      systemSettings = await SystemSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: systemSettings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update system settings
 * @route   PUT /api/settings/system
 * @access  Private (Admin only)
 */
exports.updateSystemSettings = async (req, res, next) => {
  try {
    let systemSettings = await SystemSettings.findOne({});

    if (!systemSettings) {
      systemSettings = await SystemSettings.create(req.body);
    } else {
      Object.assign(systemSettings, req.body);
      await systemSettings.save();
    }

    res.status(200).json({
      success: true,
      data: systemSettings
    });
  } catch (error) {
    next(error);
  }
};
