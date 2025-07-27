        // Demo Data
        const demoUsers = [
            {
                id: 1,
                name: "Sarah Johnson",
                email: "sarah.johnson@gmail.com",
                phone: "+1 (555) 123-4567",
                status: 'opened',
                submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                emailsSent: 2,
                lastEmailSent: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: false,
                replied: false,
                paid: false,
                stopped: false
            },
            {
                id: 2,
                name: "Michael Chen",
                email: "m.chen@outlook.com",
                phone: "+1 (555) 234-5678",
                status: 'clicked',
                submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                emailsSent: 3,
                lastEmailSent: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: true,
                replied: false,
                paid: false,
                stopped: false
            },
            {
                id: 3,
                name: "Emma Rodriguez",
                email: "emma.r@university.edu",
                phone: "+1 (555) 345-6789",
                status: 'paid',
                submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                emailsSent: 1,
                lastEmailSent: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: true,
                replied: false,
                paid: true,
                stopped: true
            },
            {
                id: 4,
                name: "David Thompson",
                email: "david.thompson@company.com",
                phone: "+1 (555) 456-7890",
                status: 'email-sent',
                submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                emailsSent: 1,
                lastEmailSent: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
                opened: false,
                clicked: false,
                replied: false,
                paid: false,
                stopped: false
            },
            {
                id: 5,
                name: "Lisa Park",
                email: "lisa.park@techstart.io",
                phone: "+1 (555) 567-8901",
                status: 'stopped',
                submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                emailsSent: 2,
                lastEmailSent: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: false,
                replied: true,
                paid: false,
                stopped: true
            }
        ];

        const demoEmailLog = [
            {
                id: 1640995200000,
                userId: 1,
                userName: "Sarah Johnson",
                userEmail: "sarah.johnson@gmail.com",
                type: "confirmation",
                subject: "🎉 Welcome to Consulting Cohort 101! Payment Required",
                body: "Congratulations! You've been selected for our exclusive Consulting Cohort 101 program.",
                sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: false
            },
            {
                id: 1640995300000,
                userId: 1,
                userName: "Sarah Johnson",
                userEmail: "sarah.johnson@gmail.com",
                type: "reminder1",
                subject: "⏰ Don't Miss Out - Complete Your Enrollment",
                body: "We noticed you haven't clicked the payment link yet.",
                sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: false
            },
            {
                id: 1640995400000,
                userId: 2,
                userName: "Michael Chen",
                userEmail: "m.chen@outlook.com",
                type: "confirmation",
                subject: "🎉 Welcome to Consulting Cohort 101! Payment Required",
                body: "Congratulations! You've been selected for our exclusive Consulting Cohort 101 program.",
                sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: true
            },
            {
                id: 1640995500000,
                userId: 3,
                userName: "Emma Rodriguez",
                userEmail: "emma.r@university.edu",
                type: "confirmation",
                subject: "🎉 Welcome to Consulting Cohort 101! Payment Required",
                body: "Congratulations! You've been selected for our exclusive Consulting Cohort 101 program.",
                sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                opened: true,
                clicked: true
            },
            {
                id: 1640995600000,
                userId: 4,
                userName: "David Thompson",
                userEmail: "david.thompson@company.com",
                type: "confirmation",
                subject: "🎉 Welcome to Consulting Cohort 101! Payment Required",
                body: "Congratulations! You've been selected for our exclusive Consulting Cohort 101 program.",
                sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                opened: false,
                clicked: false
            }
        ];

        // Initialize with demo data if no existing data
        function initializeDemoData() {
            const existingUsers = JSON.parse(localStorage.getItem('cohortUsers') || '[]');
            const existingEmailLog = JSON.parse(localStorage.getItem('emailLog') || '[]');
            
            if (existingUsers.length === 0) {
                localStorage.setItem('cohortUsers', JSON.stringify(demoUsers));
                localStorage.setItem('emailLog', JSON.stringify(demoEmailLog));
                localStorage.setItem('nextUserId', '6');
            }
        }

        // Data Storage (simulating database)
        initializeDemoData();
        let users = JSON.parse(localStorage.getItem('cohortUsers') || '[]');
        let emailLog = JSON.parse(localStorage.getItem('emailLog') || '[]');
        let nextUserId = parseInt(localStorage.getItem('nextUserId') || '6');

        // Email Templates
        const emailTemplates = {
            confirmation: {
                subject: "🎉 Welcome to Consulting Cohort 101! Payment Required",
                body: "Congratulations! You've been selected for our exclusive Consulting Cohort 101 program. Complete your enrollment by clicking the payment link: [PAYMENT_LINK]"
            },
            reminder1: {
                subject: "⏰ Don't Miss Out - Complete Your Enrollment",
                body: "We noticed you haven't opened our previous email. Your spot in Consulting Cohort 101 is still reserved. Complete payment now: [PAYMENT_LINK]"
            },
            reminder2: {
                subject: "🚀 Exclusive Benefits Await - Consulting Cohort 101",
                body: "You opened our email but haven't clicked the payment link yet. Here are additional benefits: Premium materials, 1-on-1 mentoring, job placement assistance. Secure your spot: [PAYMENT_LINK]"
            },
            final: {
                subject: "🔔 Final Reminder - Your Spot Expires Soon",
                body: "This is your final reminder. You clicked our payment link but haven't completed payment. Your spot expires in 24 hours. Complete now: [PAYMENT_LINK]"
            }
        };

        // Tab Switching with Animation
        function switchTab(tabName) {
            // Update tab buttons
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
            
            // Update tab content with fade effect
            document.querySelectorAll('.tab-content').forEach(content => {
                if (content.classList.contains('active')) {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.classList.remove('active');
                        document.getElementById(tabName).classList.add('active');
                        document.getElementById(tabName).style.opacity = '1';
                    }, 150);
                }
            });
            
            // Update dashboard if switching to it
            if (tabName === 'dashboard') {
                setTimeout(() => updateDashboard(), 200);
            } else if (tabName === 'simulator') {
                setTimeout(() => updateSimulatorSelectors(), 200);
            }
        }

        // Enhanced Form Submission with Validation
        function submitForm() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            // Enhanced validation
            if (!name || name.length < 2) {
                showNotification('Please enter a valid full name (at least 2 characters)', 'warning');
                document.getElementById('name').focus();
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                document.getElementById('email').focus();
                return;
            }
            
            if (!phone || phone.length < 10) {
                showNotification('Please enter a valid phone number', 'warning');
                document.getElementById('phone').focus();
                return;
            }
            
            // Check if email already exists
            if (users.find(user => user.email === email)) {
                showNotification('This email has already been submitted', 'warning');
                return;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('#interest-form .btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Submitting...';
            submitBtn.disabled = true;
            
            // Create new user
            const user = {
                id: nextUserId++,
                name,
                email,
                phone,
                status: 'submitted',
                submittedAt: new Date().toISOString(),
                emailsSent: 0,
                lastEmailSent: null,
                opened: false,
                clicked: false,
                replied: false,
                paid: false,
                stopped: false
            };
            
            users.push(user);
            saveData();
            
            // Simulate processing delay
            setTimeout(() => {
                // Send confirmation email
                sendEmail(user, 'confirmation');
                showNotification('Application submitted successfully! Confirmation email sent.', 'success');
                
                // Show success message
                document.getElementById('interest-form').style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                
                // Reset form after 4 seconds
                setTimeout(() => {
                    document.getElementById('interest-form').style.display = 'block';
                    document.getElementById('form-success').style.display = 'none';
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('phone').value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 4000);
            }, 1500);
        }

        // Email validation helper
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Enhanced Email Sending
        function sendEmail(user, type) {
            const template = emailTemplates[type];
            const emailEntry = {
                id: Date.now(),
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                type,
                subject: template.subject,
                body: template.body.replace('[PAYMENT_LINK]', 'https://payment.gradnext.com/cohort101'),
                sentAt: new Date().toISOString(),
                opened: false,
                clicked: false
            };
            
            emailLog.unshift(emailEntry);
            
            // Update user
            user.emailsSent++;
            user.lastEmailSent = new Date().toISOString();
            user.status = 'email-sent';
            
            saveData();
            logActivity(`📧 Email sent to ${user.name} (${user.email}) - Type: ${type}`);
        }

        // Enhanced Email Interaction Simulation
        function simulateAction() {
            const userId = parseInt(document.getElementById('user-selector').value);
            const action = document.getElementById('action-selector').value;
            
            if (!userId) {
                showNotification('Please select a user first', 'warning');
                return;
            }
            
            const user = users.find(u => u.id === userId);
            if (!user) {
                showNotification('User not found', 'warning');
                return;
            }
            
            if (user.stopped) {
                showNotification('This user\'s automation has been stopped', 'warning');
                return;
            }
            
            // Add loading state to button
            const btn = document.querySelector('[onclick="simulateAction()"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                switch (action) {
                    case 'open':
                        if (!user.opened) {
                            user.opened = true;
                            user.status = 'opened';
                            updateLatestEmail(user.id, 'opened', true);
                            logActivity(`👁️ ${user.name} opened email`);
                            showNotification(`${user.name} opened the email`, 'info');
                        } else {
                            showNotification('User has already opened the email', 'warning');
                        }
                        break;
                        
                    case 'click':
                        if (!user.opened) {
                            user.opened = true;
                        }
                        if (!user.clicked) {
                            user.clicked = true;
                            user.status = 'clicked';
                            updateLatestEmail(user.id, 'clicked', true);
                            logActivity(`🔗 ${user.name} clicked payment link`);
                            showNotification(`${user.name} clicked the payment link`, 'info');
                        } else {
                            showNotification('User has already clicked the link', 'warning');
                        }
                        break;
                        
                    case 'reply':
                        user.replied = true;
                        user.stopped = true;
                        user.status = 'stopped';
                        logActivity(`💬 ${user.name} replied to email - automation stopped`);
                        showNotification(`${user.name} replied - automation stopped`, 'success');
                        break;
                        
                    case 'pay':
                        user.paid = true;
                        user.stopped = true;
                        user.status = 'paid';
                        logActivity(`💳 ${user.name} completed payment - automation stopped`);
                        showNotification(`${user.name} completed payment!`, 'success');
                        break;
                }
                
                saveData();
                updateDashboard();
                
                // Restore button
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        }

        // Update latest email status
        function updateLatestEmail(userId, field, value) {
            const latestEmail = emailLog.find(email => email.userId === userId);
            if (latestEmail) {
                latestEmail[field] = value;
            }
        }

        // Enhanced Scheduled Email Automation
        function triggerScheduledEmails() {
            let emailsSent = 0;
            const now = new Date();
            
            const btn = document.querySelector('[onclick="triggerScheduledEmails()"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                users.forEach(user => {
                    if (user.stopped || !user.lastEmailSent) return;
                    
                    const lastEmailDate = new Date(user.lastEmailSent);
                    const hoursSinceLastEmail = (now - lastEmailDate) / (1000 * 60 * 60);
                    
                    // For demo purposes, using shorter intervals
                    const reminderInterval = 2; // 2 minutes instead of 2 days
                    
                    if (hoursSinceLastEmail >= reminderInterval) {
                        if (!user.opened && user.emailsSent === 1) {
                            sendEmail(user, 'reminder1');
                            emailsSent++;
                        } else if (user.opened && !user.clicked && user.emailsSent === 2) {
                            sendEmail(user, 'reminder2');
                            emailsSent++;
                        } else if (user.clicked && !user.paid && user.emailsSent === 3) {
                            sendEmail(user, 'final');
                            emailsSent++;
                        }
                    }
                });
                
                if (emailsSent > 0) {
                    showNotification(`${emailsSent} scheduled emails sent successfully`, 'success');
                    updateDashboard();
                } else {
                    showNotification('No scheduled emails to send at this time', 'info');
                }
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        }

        // Enhanced Payment Webhook Simulation
        function simulatePayment() {
            const status = document.getElementById('payment-status').value;
            const userId = parseInt(document.getElementById('payment-user').value);
            
            if (!userId) {
                showNotification('Please select a user', 'warning');
                return;
            }
            
            const user = users.find(u => u.id === userId);
            if (!user) {
                showNotification('User not found', 'warning');
                return;
            }
            
            const btn = document.querySelector('[onclick="simulatePayment()"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                if (status === 'success') {
                    user.paid = true;
                    user.stopped = true;
                    user.status = 'paid';
                    logActivity(`💰 Payment successful for ${user.name} - automation stopped`);
                    showNotification(`Payment successful for ${user.name}!`, 'success');
                } else {
                    logActivity(`❌ Payment failed for ${user.name}`);
                    showNotification(`Payment failed for ${user.name}`, 'warning');
                }
                
                saveData();
                updateDashboard();
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1200);
        }

        // Enhanced Dashboard Updates with Animations
        function updateDashboard() {
            // Update stats with animation
            animateCounter('total-submissions', users.length);
            animateCounter('emails-sent', emailLog.length);
            animateCounter('paid-users', users.filter(u => u.paid).length);
            
            const conversionRate = users.length > 0 ? 
                Math.round((users.filter(u => u.paid).length / users.length) * 100) : 0;
            animateCounter('conversion-rate', conversionRate, '%');
            
            // Update user list with enhanced styling
            const userListHtml = users.length > 0 ? users.map(user => `
                <div class="user-card">
                    <div class="user-status status-${user.status}">
                        ${getStatusIcon(user.status)} ${user.status.replace('-', ' ').toUpperCase()}
                    </div>
                    <h4>${user.name}</h4>
                    <p><strong>📧 Email:</strong> ${user.email}</p>
                    <p><strong>📞 Phone:</strong> ${user.phone}</p>
                    <p><strong>📅 Submitted:</strong> ${new Date(user.submittedAt).toLocaleString()}</p>
                    <p><strong>📬 Emails Sent:</strong> ${user.emailsSent}</p>
                    <p><strong>📊 Interactions:</strong> 
                        ${user.opened ? '✅ Opened' : '❌ Not Opened'} | 
                        ${user.clicked ? '✅ Clicked' : '❌ Not Clicked'} | 
                        ${user.replied ? '✅ Replied' : '❌ No Reply'} | 
                        ${user.paid ? '✅ Paid' : '❌ Not Paid'}
                    </p>
                </div>
            `).join('') : '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);"><i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i><p>No users yet. Submit the first application to get started!</p></div>';
            
            document.getElementById('user-list').innerHTML = userListHtml;
            
            // Update email log with enhanced formatting
            const emailLogHtml = emailLog.length > 0 ? emailLog.map(email => `
                <div class="log-entry">
                    <strong>[${new Date(email.sentAt).toLocaleString()}]</strong> 
                    📧 ${email.type.toUpperCase()} to ${email.userName} (${email.userEmail})
                    ${email.opened ? ' - 👁️ OPENED' : ' - 📪 UNREAD'}
                    ${email.clicked ? ' - 🔗 CLICKED' : ''}
                </div>
            `).join('') : '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);"><i class="fas fa-envelope-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i><p>No emails sent yet.</p></div>';
            
            document.getElementById('email-log').innerHTML = emailLogHtml;
        }

        // Get status icon helper
        function getStatusIcon(status) {
            const icons = {
                'submitted': '📝',
                'email-sent': '📧',
                'opened': '👁️',
                'clicked': '🔗',
                'paid': '💳',
                'stopped': '⏹️'
            };
            return icons[status] || '📝';
        }

        // Counter animation function
        function animateCounter(elementId, targetValue, suffix = '') {
            const element = document.getElementById(elementId);
            const startValue = parseInt(element.textContent) || 0;
            const increment = Math.ceil((targetValue - startValue) / 20);
            let currentValue = startValue;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if ((increment > 0 && currentValue >= targetValue) || (increment < 0 && currentValue <= targetValue)) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                element.textContent = currentValue + suffix;
            }, 50);
        }

        // Update Simulator Selectors
        function updateSimulatorSelectors() {
            const userOptions = users.map(user => 
                `<option value="${user.id}">${user.name} (${user.email}) - ${user.status.toUpperCase()}</option>`
            ).join('');
            
            const defaultOption = '<option value="">Select a user...</option>';
            const paymentOption = '<option value="">Select user for payment...</option>';
            
            document.getElementById('user-selector').innerHTML = defaultOption + userOptions;
            document.getElementById('payment-user').innerHTML = paymentOption + userOptions;
        }

        // Enhanced Utility Functions
        function saveData() {
            try {
                localStorage.setItem('cohortUsers', JSON.stringify(users));
                localStorage.setItem('emailLog', JSON.stringify(emailLog));
                localStorage.setItem('nextUserId', nextUserId.toString());
            } catch (error) {
                console.error('Error saving data:', error);
                showNotification('Error saving data. Please try again.', 'warning');
            }
        }

        function logActivity(message) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] ${message}`);
        }

        // Enhanced notification system
        function showNotification(message, type = 'info') {
            const notification = document.getElementById('notification');
            const icons = {
                success: 'fas fa-check-circle',
                info: 'fas fa-info-circle',
                warning: 'fas fa-exclamation-triangle'
            };
            
            notification.innerHTML = `<i class="${icons[type]}"></i>${message}`;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }

        function clearAllData() {
            if (confirm('⚠️ Are you sure you want to clear all data? This action cannot be undone.')) {
                users = [];
                emailLog = [];
                nextUserId = 1;
                localStorage.clear();
                updateDashboard();
                updateSimulatorSelectors();
                showNotification('All data has been cleared successfully', 'info');
            }
        }

        // Auto-trigger scheduled emails every minute (for demo purposes)
        setInterval(() => {
            if (users.length > 0) {
                // Only run if there are users and we're on the dashboard tab
                const isDashboardActive = document.getElementById('dashboard').classList.contains('active');
                if (isDashboardActive) {
                    triggerScheduledEmails();
                }
            }
        }, 60000);

        // Initialize dashboard on load
        document.addEventListener('DOMContentLoaded', function() {
            updateDashboard();
            updateSimulatorSelectors();
            
            // Add smooth scrolling for better UX
            document.documentElement.style.scrollBehavior = 'smooth';
        });

        // Keyboard shortcuts for better UX
        document.addEventListener('keydown', function(e) {
            // Alt + 1,2,3 for tab switching
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        switchTab('form');
                        break;
                    case '2':
                        e.preventDefault();
                        switchTab('dashboard');
                        break;
                    case '3':
                        e.preventDefault();
                        switchTab('simulator');
                        break;
                }
            }
        });
  