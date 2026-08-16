package anudip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import anudip.entity.Admin;
import anudip.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Add Admin
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Get All Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get Admin By ID
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    // Update Admin
    public Admin updateAdmin(Long id, Admin updatedAdmin) {

        Admin admin = adminRepository.findById(id).orElse(null);

        if (admin != null) {
            admin.setName(updatedAdmin.getName());
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPassword(updatedAdmin.getPassword());
            admin.setRole(updatedAdmin.getRole());

            return adminRepository.save(admin);
        }

        return null;
    }

    // Delete Admin
    public String deleteAdmin(Long id) {

        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return "Admin deleted successfully.";
        }

        return "Admin not found.";
    }
}