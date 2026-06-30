import jwt from "jsonwebtoken";

export const getAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

export const getRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const getResetToken = (id: string) => {
  return jwt.sign(
    { id, purpose: "reset-password" },
    process.env.JWT_SECRET as string,
    { expiresIn: "10m" },
  );
};

export const verifyResetToken = (token: string): { id: string } => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
    purpose: string;
  };

  if (decoded.purpose !== "reset-password") {
    throw new Error("Invalid reset token");
  }

  return { id: decoded.id };
};
