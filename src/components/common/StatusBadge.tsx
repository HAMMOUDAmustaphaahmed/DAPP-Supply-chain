import React from 'react';

interface StatusBadgeProps {
  status: 'critical' | 'low' | 'good' | 'pending' | 'confirmed';
  text: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  className = ''
}) => {
  const statusStyles = {
    critical: 'badge-danger',
    low: 'badge-warning',
    good: 'badge-success',
    pending: 'badge-warning',
    confirmed: 'badge-success'
  };

  return (
    <span className={`badge ${statusStyles[status]} ${className}`}>
      {text}
    </span>
  );
};

export default StatusBadge;