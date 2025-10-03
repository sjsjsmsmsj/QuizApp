
/*
    Kiểm tra access token -> ok => next 
    không ok -> 
        refresh token -> 0k => next 
        accesstoken = refresh token 

        tạo refresh token mới 
        hash refresh token mới 
        save to database 
        return client 

                    -> không ok => trả về lỗi
*/
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify access token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        // Nếu access token hết hạn -> check refresh token
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
            return res.status(401).json({ message: 'Access denied. No refresh token provided.' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token.' });
            }

            // Tạo access token mới
            const newAccessToken = jwt.sign(
                { id: decoded.id, username: decoded.username, role: decoded.role },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );

            // Tạo refresh token mới
            const newRefreshToken = jwt.sign(
                { id: decoded.id, username: decoded.username, role: decoded.role },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            // Hash refresh token mới & lưu DB
            await User.findByIdAndUpdate(decoded.id, { refreshToken: newRefreshToken });

            // Trả token mới cho client
            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        });
    }
};
